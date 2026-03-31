type StarterNoticeProps = {
  compact?: boolean;
};

const PROMPT_BUILDER_URL = 'https://prompt-builder-pink.vercel.app';

export default function StarterNotice({ compact = false }: StarterNoticeProps) {
  if (compact) {
    return (
      <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/45 mb-3">
          Start Here
        </p>
        <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.04em] text-white mb-3">
          This is your starting clay.
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-neutral-300">
          The structure is here. Now shape the design, copy, and visual direction to fit your brand.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href={PROMPT_BUILDER_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-white/10 px-3.5 py-1.5 text-white/70 transition-colors hover:text-white"
          >
            Use Prompt Builder
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/45 mb-3">
            Start Here
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.05em] text-white mb-3">
            This is your starting clay.
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-neutral-300">
            The structure is here. Now shape the design, copy, and visual direction to fit your brand.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={PROMPT_BUILDER_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full text-sm font-medium bg-transparent text-white px-5 py-2.5 hover:bg-white hover:text-black border border-white/20 transition-all"
          >
            Use Prompt Builder
          </a>
        </div>
      </div>
    </div>
  );
}
