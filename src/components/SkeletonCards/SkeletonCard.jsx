export default function SkeletonCard() {
  return (
    <div className="bg-black/40 border border-white/5 rounded-3xl p-4 flex flex-col gap-4">
      <div className="aspect-square rounded-2xl bg-white/5 animate-pulse" />
      <div className="h-4 w-2/3 rounded bg-white/5 animate-pulse" />
      <div className="h-3 w-1/2 rounded bg-white/5 animate-pulse -mt-2" />
    </div>
  );
}
