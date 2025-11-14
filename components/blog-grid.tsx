"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 1. Dados Fictícios (Mock Data)
const otherPosts = [
  {
    slug: "/blog/por-que-o-microgerenciamento-falha",
    tag: "Gestão",
    title: "Por que o Microgerenciamento Falha (e o que fazer a respeito)",
    excerpt:
      "Analisamos 5 estudos que provam por que dar autonomia é mais eficaz do que controlar cada passo.",
    imageUrl: "/images/image1.avif",
  },
  {
    slug: "/blog/o-custo-de-um-cafezinho",
    tag: "Finanças",
    title: "O Custo Oculto do 'Cafezinho' Desorganizado",
    excerpt:
      "Uma pausa de 15 minutos pode parecer pouco, mas somada, ela pode custar milhões em produtividade.",
    imageUrl: "/images/image2.avif",
  },
  {
    slug: "/blog/novidades-v1-1",
    tag: "Produto",
    title: "Novidades do BreakFlow v1.1: Relatórios Avançados",
    excerpt:
      "Estamos lançando nossa nova suíte de analytics para gestores de RH e líderes de equipe.",
    imageUrl: "https://images.unsplash.com/photo-1550063873-ab792950096b?w=600&q=80",
  },
];

export function BlogGrid() {
  return (
    <section className="relative w-full bg-gray-50 py-24 sm:py-32 dark:bg-[#121214]">
      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        {/* Título da Seção */}
        <motion.h2
          className="mb-12 text-3xl font-bold tracking-tighter text-gray-900 md:text-4xl dark:text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Mais do nosso blog
        </motion.h2>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-gray-300 hover:shadow-xl dark:border-white/5 dark:bg-[#18181B] dark:shadow-black/20 dark:hover:border-white/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
            >
              {/* Imagem do Card */}
              <Link href={post.slug} className="relative block h-48 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/600x400/1a7c37/FFFFFF?text=BreakFlow")
                  }
                />
              </Link>

              {/* Conteúdo do Card */}
              <div className="flex grow flex-col justify-between p-6">
                <div>
                  <span className="mb-3 inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-700 dark:bg-white/5 dark:text-[#9A9A9A]">
                    {post.tag}
                  </span>

                  <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                    <Link
                      href={post.slug}
                      className="hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-500 dark:text-[#9A9A9A]">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  href={post.slug}
                  className="mt-6 flex items-center gap-2 text-sm font-bold text-green-700 decoration-2 underline-offset-4 hover:underline dark:text-[#89F336]"
                >
                  Ler artigo <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
