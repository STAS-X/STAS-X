import React, {useState} from 'react'
import Api from '../API'


const Users =()=>{
    //console.log(Api.users.fetchAll())

    let [counter, setCounter]=useState(Api.users.fetchAll().length)

    const handleDeleteUser=(user_id)=> {
        document.querySelector(`tr[data-id='${user_id}'`).remove()
        setCounter((prevValue)=>(prevValue>0?prevValue-1:prevValue))
    }

    const renderHTML=()=>{
        return <React.Fragment>
                  {renderSpan()}
                  {renderTable()}
               </React.Fragment>
    }

    const getSpanClass=()=>{
        return (counter>0?'badge rounded-pill bg-primary':
                          'badge rounded-pill bg-warning')
    }

    const getSpanContent=()=> {
          return (counter>0?`${counter} человек${(counter%10>=2 && counter%10<=4 && (counter<10 || counter>20) ?'а':'')} тусанет с тобой сегодня`:
                            `Сегодня никто не тусанет с тобой`)

    }

    const renderSpan=()=> {
        return <h2>
                  <span className={getSpanClass()}>{getSpanContent()}</span>
               </h2> 
  
      }


    const renderTable=()=>{
        return <table className='table table-dark table-striped table-responsive'>
                  <thead>
                    <tr>
                      {renderCaption()}
                    </tr>
                  </thead>
                  <tbody>
                     {renderUsers()} 
                  </tbody>
               </table>   

    }

    const renderCaption=()=> {
        return ['Имя','Качества','Профессия','Встретился, раз','Оценка','Действие'].map((val, id)=>(
                                                                                    <th scope="col" key={id}>{val}</th>))  
    }

    const renderQualities=(qualities)=> {
       //console.log('test of quality')
        return qualities.map((quality,id,res)=>(<span key={quality._id}>
                                                    <span className={`badge rounded-pill bg-${quality.color} m-1`}
                                                       key={quality._id}>
                                                       {quality.name}
                                                    </span>
                                                    {(id<res.length-1?',':'')}
                                                </span>) )

      }

    const renderUsers=()=>{
        return Api.users.fetchAll().map((user,id)=> <tr key={id+1} data-id={user._id}>  
                                                      <th col='row'>{user.name}</th>
                                                      <td key={(id+1)*100+1}>{renderQualities(user.qualities)}</td>
                                                      <td key={(id+1)*100+2}>{user.profession.name}</td>
                                                      <td key={(id+1)*100+3}>{user.rate}</td>
                                                      <td key={(id+1)*100+4}>{user.completedMeetings}</td>
                                                      <td key={(id+1)*100+5}><button className='btn btn-danger m-2' onClick={()=>handleDeleteUser(user._id)}>
                                                                                  delete
                                                                             </button>
                                                      </td>
                                      
                                                    </tr>
                                                    
                                                 )
    }


    return renderHTML()
}

export default Users