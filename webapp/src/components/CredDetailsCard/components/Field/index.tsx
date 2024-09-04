export interface FieldProps {
  name: string;
  value: string;
}

const Field = ({ name, value }: FieldProps) => {
  return (
    <div className="flex flex-col font-medium hover:bg-gray-200 rounded p-2">
      <div className="text-slate-500 text-sm">{name}</div>
      <div className="text-slate-900 text-base">{value}</div>
    </div>
  );
};

export default Field;
