import pet from "../images/pets.png"

type prop = {

}

const Oups: React.FC<prop> = (prop: prop) => {
  return (
    <>
      <img src={pet} />
      <h2>Something happened...</h2>
      <p></p>
    </>
  )
}

export default Oups;