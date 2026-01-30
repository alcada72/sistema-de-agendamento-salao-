import { Notification } from "@/types/notification";

export function formatarNotification(notificacao: Notification) {
  let mensagem = "";
  let link = "/"; 
  
  switch (notificacao.type) {
    case "like":
      mensagem = "Curtiu seu post 🧡";
      if (notificacao.tweetId) link = `/tweet/${notificacao.tweetId}`;
      break;

    case "comment":
      mensagem = "Comentou no seu post 💭";
      if (notificacao.tweetId) link = `/tweet/${notificacao.tweetId}`;
      break;

    case "follow":
      mensagem = "Começou a te seguir 🖐";
      link = `/${notificacao.sender.slug}`;
      break;

    case "tweet":
      mensagem = "Adicionou um post recentemente ✍️";
      if (notificacao.tweetId) link = `/tweet/${notificacao.tweetId}`;
      break;

    case "message":
      mensagem = "Enviou uma mensagem 💬";
      if (notificacao.messageId) link = `/chat`;
      break;

    default:
      mensagem = "Fez algo novo ⭐";
      link = `/${notificacao.sender.slug}`;
      break;
  }

  return { mensagem, link };
}
