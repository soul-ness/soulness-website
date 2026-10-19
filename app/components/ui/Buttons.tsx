import type { ButtonHTMLAttributes } from 'react';
import { Link } from '../../../i18n/navigation';

type ButtonVariant =
  | 'cherry'
  | 'vanilla'
  | 'beigeDark'
  | 'transparent'
  | 'cont';

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
  cont: 'bg-transparent border border-noir text-noir hover:text-beigeDark hover:border-beigeDark',
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
    const isExternal =
      /^(https?:)?\/\//.test(href) ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:');

    if (isExternal) {
      return (
        <a href={href} target={target} rel={rel} className={finalClassName}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} target={target} rel={rel} className={finalClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={finalClassName} {...rest}>
      {children}
    </button>
  );
}
