interface ingredientProps {
  ingredients: {
    position: number;
    bgColor: string;
    image: string;
    headerText: string;
    body: string;
    textColor: string;
  };
}

function Ingredient({
  ingredients: { position, bgColor, image, headerText, body, textColor },
}: ingredientProps) {
  return (
    <div
      style={{ background: bgColor }}
      className={`flex${
        (position + 1) % 2 === 0 ? " flex-row-reverse" : ""
      } gap-6 items-center`}
    >
      <div
        className="p-8 md:p-16 space-y-3 w-full"
        style={{ color: textColor }}
      >
        <h3>{headerText}</h3>
        <p
          className="text-base"
          dangerouslySetInnerHTML={{
            __html: body.replaceAll("\n", "<br /><br />"),
          }}
        />
      </div>
      <div className="w-full">
        <img src={image} alt={headerText} />
      </div>
    </div>
  );
}

export default Ingredient;
