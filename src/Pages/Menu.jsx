

import { useState } from 'react'



function Menu() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className='h-full w-full flex flex-col'>
                Menu

                <div className='flex justify-between h-full'>
                    <button className='btn btn-primary w-1/3 h-full'>Nouveau job</button>
                    <button className='btn btn-primary w-1/3 h-full'>Rechercher jobs</button>
                    <button className='btn btn-secondary w-1/3 h-full'>historique</button>
                </div>
            </div>

        </>
    )
}

export default Menu


