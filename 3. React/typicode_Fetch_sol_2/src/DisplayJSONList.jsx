import JSONListItem from "./JSONListItem";

const DisplayJSONList = ({ DisplayJSONList = []}) => {
    return (
        <>
            { 
                DisplayJSONList && DisplayJSONList.length ?
                (
                <ul>
                    {
                        DisplayJSONList.map((item) => (
                            <JSONListItem 
                                key = {item.id}
                                item = {item}               
                            />
                        ))

                    }
                </ul>
                )
                : (
                    <p className="ErrorPara">Er zijn geen items om weer te geven</p>
                )
            }
        
        </>

    )
}

export default DisplayJSONList