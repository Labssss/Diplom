export function Modal(props) {
    return (
        <>
            <div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0 z-40" onClick={props.onClose}/>

            <div className="w-[450px] block p-6 rounded-lg shadow-lg bg-white fixed top-10 left-1/2 -translate-x-1/2 z-40">
                <h2 className="text-3xl font-semibold leading-normal mt-0 mb-5 text-gray-800">{props.title}</h2>
                {props.children}
            </div>
        </>
    )
} 