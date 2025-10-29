"use client";
import { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { HiOutlineArrowUp, HiOutlineLightBulb } from 'react-icons/hi';

import { HiOutlineArrowPath } from 'react-icons/hi2';
import dynamic from 'next/dynamic';

interface ErrorResponse {

    error:string

}

type ResponseIa  = {

    id:string,
    object:string,
    created:number,
    model:string,
    choices:[{message:{role:string, content:string}}]

} | ErrorResponse

interface textObj {

    text:string,
    key:number

}

const ReactMarkdown = dynamic(() => import('react-markdown'))


const getTimeResponseIA = (responseTime:number, startTime:number) => {

        const endTime = responseTime * 1000

        const diffTime = endTime - startTime
        const seconds = Math.floor((diffTime / 1000) % 60)
        const minutes = Math.floor(seconds / 60)
   
        return `${minutes > 0 ? minutes+'min e':''} ${seconds}s.`

    }

const IaPageClient  = ({api, token}:{api:string, token:string}) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>()
    const [result, setResult] = useState<null | ResponseIa>(null)
    const [text, setText] = useState<textObj|null>(null)
    const startTimeRef = useRef<null | number>(null)
    const refResponse = useRef<null | HTMLDivElement>(null)

    useEffect(() => {

        if (text === null) return
        (async() => {

            try {

            setLoading(true)

            startTimeRef.current = Date.now()
            const response = await fetch(api, {

                method:'POST',
                headers:{'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({

                    model:'deepseek-ai/DeepSeek-V3.1-Terminus',
                    messages: [

                        {

                            role:'user',
                            content:text.text,

                        }

                    ]

                })

            })

            const data = await response.json()

            setLoading(false)
            setResult(data)
            

            } catch(error) {

                setError(error)
                setLoading(false)
                setResult(null)

            }

        })()

    }, [text])



    useEffect(() => {

        if (result && 'choices' in result && !loading && refResponse.current) {
            refResponse.current
            .scrollIntoView({ behavior: 'smooth',
                block: 'start' });
        }
        

    }, [result, loading])

    
    useEffect(() => {
        
        if(result && !('error' in result)) return  

        setError(result?.error)
        
    },[(result as ErrorResponse)?.error])

    

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const conversation = formData.get('chat') as string

        setText({text:conversation, key:Date.now()})
        

    }   

    console.log(result)
    console.log(error)

    return (

        <div className={"content "+styles.iaContent}>
        <div className={styles.iaChatContent}>   
        <div className={styles.ResponseIa}>
            
            Me pegunte algo...

        </div>

        {text && <div key={text.key}
        className={`${styles.iaChat} ${styles.user}`}>
            {text.text}
        </div>}

        {result && 'choices' in result && !loading   ? 

        <div className={`${styles.ResponseIa}
        ${styles.finalResponse}`}>

            <div className={styles.timeResponseContent} ref={refResponse}>

            <HiOutlineLightBulb size={32}/>
            <span>Pensou por {getTimeResponseIA(result.created, startTimeRef.current!)}</span>

            </div>
            
            <ReactMarkdown>
            {result?.choices?.[0]?.message?.content as string}
            </ReactMarkdown>

        </div>
        : loading ? <div>Loading...</div>:''
        }

        {error && !loading?
        <div className={styles.errorChat}>

            <button onClick={() => {
                setResult(null)
                setError(null)
                setText(prev => {

                    return {...prev, key:Date.now()} as textObj

                })

            }}>
                <HiOutlineArrowPath size={24}/>
            </button>
            <span>Houve um erro ao receber uma resposta...</span>

        </div>:''
        }



        <div></div>

        </div>
        
        <form onSubmit={handleSubmit} className={styles.formChat}>
            <div className={styles.textareaContent}>
            <textarea name="chat" id="chat"
            placeholder="Digite algo(sobre as notas) ..."
            className={styles.chatUser}>


            </textarea>
            <button type="submit" className={styles.chatSubmit} 
            disabled={loading}>

                <HiOutlineArrowUp size={18}/>

            </button>
            </div>

        </form>
        
        </div>

    )

}

export default IaPageClient