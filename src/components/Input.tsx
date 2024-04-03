const Input = ({
  id,
  name,
  type,
  defaultValue,
}: {
  id: string
  name: string
  type: string
  defaultValue?: string
}) => {
  return (
    <div className="w-full flex flex-col">
      <input
        id={id}
        name={name}
        type={type}
        className="w-full rounded-md p-4 bg-slate-200 focus:border-2 focus:border-slate-300"
        defaultValue={defaultValue}
        placeholder={defaultValue ? '' : name}
      ></input>
    </div>
  )
}

export default Input
