"use server";
import { auth } from 'auth'
import { redirect } from 'next/navigation';
import { prisma } from 'prisma'
import { ToastObj } from './types/ToastObj';
import { revalidatePath } from 'next/cache';
import { TodoByText } from './types/Todo';
import { promises as fs } from 'fs'
import path from 'path';

export const getUserById = async () => {

    const session = await auth()
    
    try {

        const user = await prisma.user.findUnique({

            where:{id:session?.user?.id}

        })

        return user 

    } catch {

        return null

    }

}

export const updateUserById = async (formData:FormData, pathname='/profile') => {

    const session = await auth()
    if (!session || !session.user) redirect('/signin')
    
    const imageFile = formData.get('imageInput') as File
    const name = formData.get('username') as string

    let dataObj:{name?:string, image?:string} = name ? {name}:{}
    

    try {
        
        if (imageFile) {

        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        await fs.mkdir(uploadDir, {recursive:true})
        const newImageName = +Date.now()+imageFile.name
        const filePath = path.join(uploadDir, newImageName)
        const arrayBuffer = await imageFile.arrayBuffer()
        await fs.writeFile(filePath, Buffer.from(arrayBuffer))
        console.log('img file')
        dataObj.image = `/uploads/${newImageName}`

        }
        
        console.log('action sagaz')

        await prisma.user.update({

            where:{id:session.user.id},
            data:dataObj

        })

        revalidatePath(pathname)

        return {text:'Dados atualizados com êxito!',
            key:Date.now(), type:'success' 
        } satisfies ToastObj

    } catch {

        return {text:'Dados do usuários salvos com sucesso!',
            key:Date.now(), type:'error'
        } satisfies ToastObj

    }

}

export const findTodosByUserId = async (page:number) => {

    const session = await auth()
    const pageSize = 10
    

    if (!session) redirect('/signin')

    const tarefas = await prisma.todo.findMany({

        where: {userId:session.user?.id},
        take:10,
        skip:(page - 1) * pageSize,
        orderBy:{createdAt:'desc'}

    })

    const contagemTarefas = await prisma.todo.count({

        where:{userId:session?.user?.id}

    }) 

    const tamanho = Math.ceil(contagemTarefas / 10)


    return {tarefas, tamanho}

}


export const findTodosByText = async (formData:FormData,
    signal?:AbortSignal ):Promise<TodoByText>  => {

    const session = await auth()
    const text = formData.get('searchTodo') as string || ''
    const pageSize = 10
    const page = parseInt(formData.get('page') as string)
    
    if (!session?.user?.id) redirect('/signin')

    try {
        
    
        const [tarefas, tarefasContagem] = await Promise.all([

            await prisma.todo.findMany({

                where:{

                    userId:session.user?.id,
                    OR:[

                        {title:{contains:text as string}},
                        {description:{contains:text as string}}

                    ],

                },

                take:10,
                skip:(page - 1) * pageSize,
                orderBy:{createdAt:'desc'},

            }),

            await prisma.todo.count({

                where:{

                    userId:session.user.id,
                    OR:[

                        {title:{contains:text as string}},
                        {description:{contains:text as string}}

                    ]


                },


            })

        ])

        

    const tamanho = Math.ceil(tarefasContagem / 10)

    const search = encodeURIComponent(text)

    revalidatePath('/todos')

    return {tarefas, tamanho, search} as TodoByText
        
    } catch {

        throw new Error('Erro ao buscar dados')

    } 

}

export const createTodo = async (
    formState:ToastObj, formData:FormData):Promise<ToastObj> => {

    const session = await auth()    
    
    if (session === null) {
    
        return {text:"Usuário não autenticado!", type:'error', 
            key:Date.now()}

    }

    const title = formData.get('titleTodo') as string
    const description = formData.get('descriptionTodo') as string  

    if (title.length === 0 || description.length === 0 ) {

        return {text:'Preencha todos os campos!', type:'info', key:Date.now()}

    }

    else if (title.length < 8) {

        return {text:'Título muito curto!', type:'info', key:Date.now()}

    }

    else if (description.length < 15) {

        return {text:'Descrição muito curta!', type:'info', key:Date.now()}

    }
 
    try {

    await prisma.todo.create({


        data:{

            title, 
            description, 
            userId:session.user?.id as string
        }

    })
    

    return {text:'Tarefa criada com sucesso!', type:'success', key:Date.now()}

    } catch(error) {
        console.log(error)
        return {text:String(error), type:'error', key:Date.now()}

    }


}

export const findTodoById = async (id:number) => {

    const session = await auth()    
    
    if (session === null) {
    
        redirect('/')

    }

    const todo = await prisma.todo.findUnique({

        where:{id, userId:session.user?.id}, 

    })

    if (!todo) redirect('/todos')
    
    return todo

}


export const updateTodoById = async (
    formState:ToastObj, formData:FormData
):Promise<ToastObj> => {

    const id = parseInt(formData.get('TodoId') as string)
    const title = formData.get('titleTodo') as string
    const description = formData.get('descriptionTodo') as string

    const session = await auth()    

    if (session === null) {
    
        redirect('/')

    }

    try {

        const todo = await findTodoById(id)
        todo.title = title
        todo.description = description

        await prisma.todo.update({

        where:{id, userId:session.user?.id},
        data:todo

        })

        revalidatePath('/todos/'+id)

        
        return {text:"Nota atualizada com sucesso!", type:'success', 
            key:Date.now()}
    
    } catch {

        return {text:"Erro ao atualizar a nota.", type:'error', 
            key:Date.now()}

        }  


}

export const deleteTodoById = async (id:number, path='/todos'):Promise<ToastObj> => {

    const session = await auth()    
    
    if (session === null) {
    
        redirect('/signin')

    }

    try {

        await prisma.todo.delete({

            where:{id, userId:session?.user?.id},


        })

        revalidatePath(path)

        return {text:'Nota deletada com sucesso!', type:'success',
            key:Date.now()
        }

    } catch {

        return {text:'Erro ao deletar a nota!', type:'error',
            key:Date.now()
        }

    }

}

