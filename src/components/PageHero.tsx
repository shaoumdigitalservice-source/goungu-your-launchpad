import { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  children?: ReactNode;
}

const PageHero = ({ eyebrow, title, description, image, children }: Props) => (
  <section className="relative pt-10 lg:pt-16 pb-16 lg:pb-24 overflow-hidden">
    {image && (
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/85 to-background" />
      </div>
    )}
    <div className="container mx-auto px-4 lg:px-8 relative">
      <div className="max-w-3xl animate-fade-up">
        {eyebrow && (
          <span className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">{eyebrow}</span>
        )}
        <h1 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.05] mt-3">{title}</h1>
        {description && <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>}
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;