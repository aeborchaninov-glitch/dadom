"use client";
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){return <section className="section"><div className="wrap"><h1 className="display text-4xl">Не удалось загрузить страницу</h1><p className="muted mt-4">Попробуйте ещё раз.</p><button type="button" onClick={reset} className="button mt-6">Повторить</button></div></section>;}
