const TextArea = ({
  id,
  name,
  value,
}: {
  id: string
  name: string
  value?: string
}) => {
  return (
    <textarea
      id={id}
      name={name}
      className="w-full h-full rounded-md p-4 bg-slate-200 focus:border-2 focus:border-slate-300"
      defaultValue={value}
      placeholder={value ? value : name}
      rows={5}
      required
    ></textarea>
  )
}
export default TextArea
