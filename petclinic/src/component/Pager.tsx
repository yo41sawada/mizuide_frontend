import { ReactElement, useEffect, useState } from "react"
import { Link } from "react-router-dom"

type prop = {
    linkUrl: string
    currentPage: number
    totalPages: number
}

const Pager: React.FC<prop> = (prop: prop) => {
    const [panels, setPanels] = useState<ReactElement[]>([])
    const [first, setFirst] = useState<ReactElement>();
    const [prev, setPrev] = useState<ReactElement>();
    const [next, setNext] = useState<ReactElement>();
    const [last, setLast] = useState<ReactElement>();

    useEffect(() => {
        let tmp = []
        let sepMark = '?'
        if (prop.linkUrl.includes('?'))
            sepMark = '&'
        for (let i = 1; i <= prop.totalPages; i++) {
            if (i === prop.currentPage)
                tmp.push(<span key={i}><span>{`${i}`}</span>{`\n`}</span>)
            else
                tmp.push(<span key={i}><Link to={`${prop.linkUrl + sepMark}page=${i}`}>{i}</Link>{`\n`}</span>)
        }
        setPanels(tmp)
        if (prop.currentPage === 1) {
            setFirst(<span title="First" className="fa fa-fast-backward"></span>)
            setPrev(<span title="Previous" className="fa fa-step-backward"></span>)
        } else {
            setFirst(<Link to={`${prop.linkUrl + sepMark}page=1`} title="First" className="fa fa-fast-backward"></Link>)
            setPrev(<Link to={`${prop.linkUrl + sepMark}page=${prop.currentPage - 1}`} title="Previous" className="fa fa-step-backward"></Link>)
        }

        if (prop.currentPage === prop.totalPages) {
            setNext(<span title="Next" className="fa fa-step-forward"></span>)
            setLast(<span title="Last" className="fa fa-fast-forward"></span>)
        } else {
            setNext(<Link to={`${prop.linkUrl + sepMark}page=${prop.totalPages}`} title="Next" className="fa fa-step-forward"></Link>)
            setLast(<Link to={`${prop.linkUrl + sepMark}page=${prop.currentPage + 1}`} title="Last" className="fa fa-fast-forward"></Link>)
        }

    }, [prop.linkUrl, prop.currentPage, prop.totalPages])
    return (
        <div>
            <span>Pages:{`\n`}</span>
            <span>[{`\n`}</span>
            {panels}
            <span>{`\n`}]&nbsp;</span>
            <span>{`\n`}{first}</span>
            <span>{`\n`}{prev}</span>
            <span>{`\n`}{next}</span>
            <span>{`\n`}{last}</span>
        </div>
    )
}

export default Pager;