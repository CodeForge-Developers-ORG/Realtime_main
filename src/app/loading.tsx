export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-gradient-to-br from-[#1f1f1f] via-[#2a2a2a] to-[#111]"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Preloader animation (from preloader-animation) */}
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}