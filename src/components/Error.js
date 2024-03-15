import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err)
  return(
    <>
      <h1>Error {err?.status} occured</h1>
      <h2>{err.data}</h2>
    </>
  )
}

export default Error;
