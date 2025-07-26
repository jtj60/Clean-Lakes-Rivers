export default function orSeparator() {
  return (
    <div className="flex w-full justify-center items-center mb-8 text-sm text-neutral-500 ">
      <div className="flex-grow">
        <div className="separator-inset"/>
      </div>
      <span className="px-4">or</span>
      <div className="flex-grow">
        <div className="separator-inset"/>
      </div>
    </div>
  )
}