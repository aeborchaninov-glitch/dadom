import {company} from "@/data/company";
export function ContactDetails() {
  const hasContacts=company.phone||company.email||company.telegram||company.whatsapp;
  return <div className="space-y-3 text-sm leading-7">
    {company.phone&&<p><a className="underline underline-offset-4" href={"tel:"+company.phone.replace(/[^+\d]/g,"")}>{company.phone}</a></p>}
    {company.email&&<p><a className="underline underline-offset-4" href={"mailto:"+company.email}>{company.email}</a></p>}
    {company.officeAddress&&<p>{company.officeAddress}</p>}
    {company.telegram&&<p><a href={company.telegram} rel="noopener noreferrer" className="underline">Telegram</a></p>}
    {company.whatsapp&&<p><a href={company.whatsapp} rel="noopener noreferrer" className="underline">WhatsApp</a></p>}
    {!hasContacts&&<p>Контактные данные готовятся к публикации. Приём обращений через сайт пока недоступен.</p>}
  </div>;
}
