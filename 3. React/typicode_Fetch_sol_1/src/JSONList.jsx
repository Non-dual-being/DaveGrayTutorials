import  JSONListItem  from './JSONListItem.jsx'

const JSONList = ({ JSONObjList = []}) => {
    return (
        <>
        
        {JSONObjList && JSONObjList.length > 0 ?
            (           
            <ul className='JSONList'>
                {JSONObjList.map(item => (
                <JSONListItem 
                    key = {item.id || crypto.randomUUID()}
                    item = {item}

                />
                ))}
            </ul> 
            )
          
             : (<p className ="ErrorPara">Er zijn geen items om weer te geven</p>)
        }

        </>
        
    )
}

export default JSONList