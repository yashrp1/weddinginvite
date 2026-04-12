function InviteVideo() {
  return (
    <main className="min-h-screen bg-[#090203] text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(243,210,123,0.22),transparent_34%),linear-gradient(180deg,#1b0509_0%,#090203_62%,#000_100%)]" />
        <div className="relative z-10 w-full max-w-[430px]">
          <div className="mb-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#f3d27b]/75">
              Wedding Video Invite
            </p>
            <h1 className="mt-3 font-display text-4xl leading-none text-[#fff4d9]">
              Dipesh &amp; Poonam
            </h1>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/8 p-2 shadow-[0_0_120px_rgba(214,165,75,0.16)] backdrop-blur-md">
            <video
              className="aspect-[9/16] w-full rounded-[1.5rem] bg-black object-contain"
              src="/video-invite.mp4"
              controls
              autoPlay
              playsInline
              preload="metadata"
            >
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mt-5 flex flex-col gap-3 text-center sm:flex-row">
            <a
              href="/video-invite.mp4"
              download
              className="flex-1 rounded-full border border-[#f3d27b]/25 bg-[#f3d27b]/12 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#fff4d9] transition hover:-translate-y-1 hover:bg-[#f3d27b]/20"
            >
              Download Video
            </a>
            <a
              href="/"
              className="flex-1 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:-translate-y-1 hover:bg-white/12"
            >
              View Web Invite
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default InviteVideo;
