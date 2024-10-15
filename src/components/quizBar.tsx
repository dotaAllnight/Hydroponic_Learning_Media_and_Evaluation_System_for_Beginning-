import React from 'react'

type Props = {
    value: number
}
8
const QuizBar = (props: Props) => {
    return (
        <div>
            <div className='w-full bg-gray-800 rounded-full h-2.5 '>
                <div className='bg-blue-600 h-2.5 rounded-md' style={{
                    width: `${props.value}%`
                }}></div>

            </div>
        </div>
    )
}

export default QuizBar