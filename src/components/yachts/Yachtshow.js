import React from 'react'

const Yachtshow = () => {
  return ( 
<div>
<img className="yachtimg" src={url} alt="Slide one" />
          <div className="caption">
            <h2 className="card text-secondary">Name: {yat.name}</h2>
            <h3 className="carde text-secondary">Description: {yat.description}</h3>
            <h3 className="card text-secondary">
              Price:
              {" $"}
              {yat.price}
            </h3>
            {/* <h3 className="card"> {yat.image}</h3> */}
            <button className="btn" variant="success" type="button" size="lg" onClick={handleClick}>
              <Link to={"/reserve/" + yat.id} className="reserve app" id={yat.id}>
                {" "}
                Reserve
              </Link>
            </button>
            </div>
</div>)
}

export default Yachtshow;