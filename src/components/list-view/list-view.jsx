import { CardView } from "../card-view/card-view";

export const ListView = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <CardView></CardView>

        <button className="bg-button text-xl w-10 h-10 rounded-full mt-5 border-1 border-black shadow active:scale-80 flex items-center justify-center">
          <span className="material-icons md-18">add</span>
        </button>
      </div>
    </>
  );
}