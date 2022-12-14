const errorHandler=(err,req,res,next)=>{
    const statuscode=res.statuscode || 500
    res.statuscode(statuscode)
    res.json({
        "message":err.message,
        "stack":err.stack

    })
}

module.exports={errorHandler}