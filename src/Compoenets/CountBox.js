import React from 'react'

const CountBox = (props) => {
    return (
        <div className="card shadow rounded-lg border-0">
            <div className="card-body">
                <img alt={props.title} className="img-responsive float-right" src={props.image} />
                <p className="text-muted">{props.title}</p>
                <h1>{props.count && props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                <p className="text-muted"><span className={`badge bg-${props.color}`}>{props.new && props.new.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> Today </p>
            </div>
        </div>
    )
}

export default CountBox
