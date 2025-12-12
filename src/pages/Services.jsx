import React from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { FaSeedling, FaTree, FaCloud, FaPeopleGroup, FaTractor, FaCow, FaJava, FaCircleDot } from 'react-icons/fa6'

// Updated services based on old site content: Agriculture, Elevage, Biodiversite, Climat, etc.
const services = [
    {
        title: 'Agriculture Durable',
        desc: 'Transformation de l’agriculture et adoption de pratiques intelligentes face au climat pour la sécurité alimentaire.',
        icon: FaSeedling,
    },
    {
        title: 'Tu connais le jeu',
        desc: 'c’est une façon pour moi de te montrer qui controle le jeu par ici mec .',
        icon: FaJava,
    },
    {
        title: 'Reboisement & Climat',
        desc: 'Pépinières scolaires, reboisement et lutte contre le réchauffement climatique via des essences forestières et fruitières.',
        icon: FaTree,
    },
    {
        title: 'Biodiversité',
        desc: 'Protection des écosystèmes, éducation sur l’impact des comportements humains et conservation de la nature.',
        icon: FaCloud,
    },
    {
        title: 'Projets Communautaires',
        desc: 'Promotion du bien-être de la population, santé, éducation et développement rural participatif.',
        icon: FaPeopleGroup,
    },
    {
        title: 'Élevage Responsable',
        desc: 'Systèmes d’approvisionnement alimentaire intelligents réduisant les émissions de gaz à effet de serre.',
        icon: FaCow,
    },
    {
        title: 'Équipements & Formation',
        desc: 'Accompagnement technique et matériel pour les producteurs locaux.',
        icon: FaTractor,
    },
]

export function Services() {
    return (
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
            <SectionTitle kicker="Nos Services d’action" title="Leviers d'Impact Durable" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((item) => (
                    <div
                        key={item.title}
                        className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-[#63b32e]">
                            <item.icon className="h-6 w-6" />
                        </div>
                        <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                    </div>
                ))}
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800">Approche Intégrée</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li className='flex flex-row item-center gap-2'><FaCircleDot className='mt-[6px] text-[#0f70b7] text-[8px]'></FaCircleDot> Synergie entre agriculture et conservation</li>
                        <li className='flex flex-row item-center gap-2'><FaCircleDot className='mt-[6px] text-[#0f70b7] text-[8px]'></FaCircleDot> Implication des communautés locales</li>
                        <li className='flex flex-row item-center gap-2'><FaCircleDot className='mt-[6px] text-[#0f70b7] text-[8px]'></FaCircleDot> Innovation technologique et écologique</li>
                    </ul>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800">Objectifs Clés</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li className='flex flex-row item-center gap-2'><FaCircleDot className='mt-[6px] text-[#0f70b7] text-[8px]'></FaCircleDot> Sécurité alimentaire durable</li>
                        <li className='flex flex-row item-center gap-2'><FaCircleDot className='mt-[6px] text-[#0f70b7] text-[8px]'></FaCircleDot> Résilience climatique accrue</li>
                        <li className='flex flex-row item-center gap-2'><FaCircleDot className='mt-[6px] text-[#0f70b7] text-[8px]'></FaCircleDot> Restauration des paysages dégradés</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
