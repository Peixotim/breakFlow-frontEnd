"use client";

import Link from "next/link";

import React from "react";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-gray-200 bg-gray-100 py-16 dark:border-white/5 dark:bg-[#121214]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="absolute bottom-0 left-0 h-1/2 w-full mask-[radial-gradient(ellipse_100%_100%_at_50%_100%,#000_10%,transparent_100%)]">
        <div className="absolute inset-0 bg-[#89F336]/10 blur-[150px]"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 pr-8 lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-tr from-[#89F336] to-[#9EFF55] text-lg font-bold">
                🥑
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">BreakFlow</span>
            </Link>
            <p className="max-w-xs text-base leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
              Uma plataforma SaaS para gestão de produtividade e pausas corporativas.
            </p>
          </div>

          <div className="text-sm">
            <h4 className="mb-4 font-bold tracking-wide text-gray-900 dark:text-white">Produto</h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="#features">Funcionalidades</FooterLink>
              </li>
              <li>
                <FooterLink href="#pricing">Preços</FooterLink>
              </li>
              <li>
                <FooterLink href="/changelog">Changelog</FooterLink>
              </li>
              <li>
                <FooterLink href="/login">Login</FooterLink>
              </li>
            </ul>
          </div>
          <div className="text-sm">
            <h4 className="mb-4 font-bold tracking-wide text-gray-900 dark:text-white">Recursos</h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/blog">Blog</FooterLink>
              </li>
              <li>
                <FooterLink href="/docs">Documentação</FooterLink>
              </li>
              <li>
                <FooterLink href="/status">
                  Status <ArrowUpRight className="inline h-3 w-3" />
                </FooterLink>
              </li>
            </ul>
          </div>
          <div className="text-sm">
            <h4 className="mb-4 font-bold tracking-wide text-gray-900 dark:text-white">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/sobre">Sobre Nós</FooterLink>
              </li>
              <li>
                <FooterLink href="/contato">Contato</FooterLink>
              </li>
              <li>
                <FooterLink href="/termos">Termos de Uso</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacidade">Privacidade</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-gray-200 pt-8 sm:flex-row dark:border-white/10">
          <p className="text-sm text-gray-500 dark:text-[#666666]">
            © {new Date().getFullYear()} BreakFlow Inc. Todos os direitos reservados.
          </p>

          <div className="mt-4 flex items-center gap-4 sm:mt-0">
            <SocialLink href="https://github.com" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </SocialLink>
            <SocialLink href="https://linkedin.com" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </SocialLink>
            <SocialLink href="https://twitter.com" aria-label="Twitter/X">
              <Twitter className="h-5 w-5" />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-[#9A9A9A] dark:hover:text-white"
  >
    {children}
  </Link>
);

type SocialLinkProps = React.ComponentPropsWithoutRef<"a">;

const SocialLink = ({ href, children, ...props }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
    className="text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-[#666666] dark:hover:text-[#89F336]"
  >
    {children}
  </a>
);
