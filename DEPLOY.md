# Guia de Deploy — JGremodelar
## Como publicar o site no cPanel via Git

Este documento explica como fazer o deploy do site **JGremodelar** para o servidor de produção utilizando a funcionalidade Git do cPanel.

---

## 📋 Pré-requisitos

1. **Git instalado no seu computador local**  
   → [Download do Git](https://git-scm.com/downloads)

2. **Acesso ao cPanel** com a funcionalidade "Git Version Control" ativada

3. **Acesso SSH ao servidor** (opcional, mas recomendado)

---

## 🔧 Método 1: Deploy via GIT no cPanel (Recomendado)

### Passo 1 — Criar o repositório Git local

No seu computador, dentro da pasta do projeto:

```bash
cd C:\Users\filip\Desktop\site jg
git init
git checkout -b main
git add .
git commit -m "Versão inicial — site institucional JGremodelar"
```

### Passo 2 — Criar o repositório no cPanel

1. Aceda ao **cPanel** do seu alojamento
2. Procure a secção **"Git™ Version Control"** (ou "Git Version Control")
3. Clique em **"Create"**
4. Preencha:
   - **Repository Name:** `jgremodelar`
   - **Repository Path:** `/home/seu-user/public_html/jgremodelar.git`
   - **Clone with SSH?** Desmarcado (vamos usar HTTPS)
5. Clique em **"Create"**

### Passo 3 — Criar um Deployment Key (se usar SSH)

Se o seu cPanel suportar, crie uma chave SSH no servidor:

```bash
ssh seu-user@seu-dominio.pt "ssh-keygen -t rsa -b 4096 -f ~/.ssh/deploy -N ''"
cat ~/.ssh/deploy.pub
```

Adicione essa chave pública às suas **Deployment Keys** no GitHub/GitLab.

### Passo 4 — Ligar o repositório local ao cPanel

```bash
git remote add production ssh://seu-user@seu-dominio.pt/home/seu-user/public_html/jgremodelar.git
git push production main
```

### Passo 5 — Fazer o Checkout no public_html

No cPanel, após o push bem-sucedido:
1. Vá a **"Git™ Version Control"**
2. Encontre o repositório `jgremodelar`
3. Clique em **"Manage"**
4. Clique em **"Clone"** ou verifique se o caminho aponta para `public_html/`
5. Se necessário, faça **"Pull"** ou **"Deploy"** manualmente

> 💡 **Dica:** Alguns cPanels permitem configurar **"Auto Deploy"** — quando ativo, cada `git push` é automaticamente refletido no `public_html`.

---

## 🌐 Método 2: Upload Manual via FTP (Alternativa)

1. Use um cliente FTP (ex: FileZilla, WinSCP)
2. Faça login com as credenciais FTP do cPanel
3. Faça upload de **todos os ficheiros e pastas** para a pasta `public_html/`
   - `index.html`
   - `quem-somos.html`
   - `servicos-interiores.html`
   - `servicos-exteriores.html`
   - `contacto.html`
   - `.htaccess`
   - `assets/` (pasta completa)

---

## 📁 Estrutura Final no Servidor

A pasta `public_html/` deve ficar assim:

```
public_html/
├── index.html
├── quem-somos.html
├── servicos-interiores.html
├── servicos-exteriores.html
├── contacto.html
├── .htaccess
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/       (se houver imagens)
└── .git/             (criado automaticamente pelo Git)
```

---

## ✅ Verificação pós-deploy

1. Aceda a **https://jgremodelar.pt** — o Hero deve aparecer
2. Teste a navegação: Início → Quem Somos → Serviços → Contacto
3. Verifique se o botão do WhatsApp funciona
4. Teste num dispositivo móvel (responsividade)
5. Verifique se o `.htaccess` está a remover a extensão `.html` dos URLs

---

## ❗ Notas importantes

- **Nunca edite ficheiros diretamente no servidor** — faça as alterações localmente e faça push
- O `.htaccess` precisa que o módulo `mod_rewrite` esteja ativo no servidor (ativado por padrão na maioria dos alojamentos cPanel)
- Se o URL amigável (sem `.html`) não funcionar, o `.htaccess` pode necessitar de ajustes conforme a configuração do seu servidor

---

## 🆘 Suporte

Caso precise de ajuda com o deploy, entre em contacto com o suporte técnico do seu alojamento ou da JGremodelar.