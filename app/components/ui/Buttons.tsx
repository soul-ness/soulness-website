import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'cherry' | 'vanilla' | 'beigeDark' | 'transparent';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  href?: string;
  target?: string;
  rel?: string;
}

const baseClasses = [
  'text-center text-label',
  'px-8 py-3',
  'transition-colors duration-300',
  'cursor-pointer',
].join(' ');

const styles: Record<ButtonVariant, string> = {
  cherry: 'bg-cherry text-vanilla hover:bg-beige hover:text-cherry',
  vanilla: 'bg-vanilla text-cherry hover:bg-cherry hover:text-vanilla',
  beigeDark: 'bg-beigeDark text-vanilla hover:bg-oat hover:text-beigeDark',
  transparent:
    'bg-transparent border border-vanilla text-vanilla hover:text-oat hover:border-oat',
};

export function Buttons({
  variant,
  children,
  className,
  href,
  target,
  rel,
  ...rest
}: ButtonProps) {
  const variantStyles = styles[variant];
  const finalClassName = [baseClasses, variantStyles, className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={finalClassName}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={finalClassName} {...rest}>
      {children}
    </button>
  );
}
