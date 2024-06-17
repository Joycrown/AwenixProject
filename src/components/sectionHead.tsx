interface sectionHeadProps {
  name: string;
  position: string;
}

function SectionHead({ name, position }: sectionHeadProps) {
  return (
    <div
      className={`flex items-center w-fit gap-3 ${
        position === "left" ? "mr-auto" : "ml-auto"
      }`}
      id={name}
    >
      <div className="bg-default-400 w-5 h-10 rounded" />
      <span className="capitalize text-default-400">{name}</span>
    </div>
  );
}

export default SectionHead;
