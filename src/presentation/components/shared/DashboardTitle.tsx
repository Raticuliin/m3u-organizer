export default function DashboardTitle({ text }: { text: string }) {
  return (
    <h2
      className="
        mb-5
        text-2xl font-bold"
    >
      {text}
    </h2>
  );
}
