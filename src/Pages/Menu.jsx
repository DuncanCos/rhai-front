

import { useState } from 'react'



function Menu() {
    const [count, setCount] = useState(0)

    return (
        <>
            {/* J'ai ajouté h-screen pour l'exemple, assurez-vous que le parent a une hauteur définie */}
            <div className='h-screen w-full p-4 flex flex-col gap-6 bg-base-100 rounded-lg shadow-xl  border-b border-base-300 border-2'>

                <h2 className='text-3xl font-bold text-primary border-b pb-2'>
                    Menu Principal
                </h2>

                <div className='flex flex-row gap-4 h-8/10 border-l border-base-900 border-2 '>

                    {/* Bouton 1 : flex-col pour mettre l'icône au dessus */}
                    <button className='btn btn-primary shadow-md hover:shadow-lg transition duration-150 flex-1 flex flex-col gap-3 items-center justify-center text-xl h-full'>
                        <span className="text-4xl">🚀</span>
                        <span>Nouveau Job</span>
                    </button>

                    {/* Bouton 2 */}
                    <button className='btn btn-primary shadow-md hover:shadow-lg transition duration-150 flex-1 flex flex-col gap-3 items-center justify-center text-xl h-full'>
                        <span className="text-4xl">🔎</span>
                        <span>Rechercher Jobs</span>
                    </button>

                    {/* Bouton 3 */}
                    <button className='btn btn-secondary shadow-md hover:shadow-lg transition duration-150 flex-1 flex flex-col gap-3 items-center justify-center text-xl h-full'>
                        <span className="text-4xl">🕒</span>
                        <span>Historique</span>
                    </button>

                </div>
            </div>
        </>
    )
}

export default Menu


