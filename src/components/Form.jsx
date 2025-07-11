import { Mail } from 'lucide-react'
import React from 'react'

export default function Form({ formRef, aff }) {
    return (
        <>
            <div className='form' onClick={(e) => e.target === e.currentTarget && aff()}>
                <div className="glass-form">
                    <h2>
                        <span>
                            <Mail />
                        </span>
                        <span>Contactez-nous</span>
                    </h2>
                    <form ref={formRef}>
                        <input type="text" placeholder="Nom complet" />
                        <input type="email" placeholder="Adresse e-mail" />
                        <textarea placeholder="Votre message"></textarea>
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            </div>
        </>
    )
}
