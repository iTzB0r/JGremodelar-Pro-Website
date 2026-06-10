# Guia de Deploy — JGremodelar.pt

## Como publicar o site no cPanel via Git

Este guia explica como ligar o teu repositório Git local ao servidor cPanel para fazeres deploy automático do site.

---

## 1. No cPanel — Criar um repositório Git no servidor

1. Acede ao **cPanel** do teu alojamento.
2. Procura a secção **"Git™ Version Control"** (ou "Git Version Control").
3. Clica em **"Create"**.
4. Preenche:
   - **Repository Path:** `/home/teuutilizador/public_html/jgremodelar`
   - **Repository Name:** `jgremodelar` (ou o nome que preferires)
5. Clica em **"Create"**.

Após criar, o cPanel mostra-te o **comando clone** (algo como `ssh://...` ou `https://...`). Copia esse URL.

> **Nota:** Se o cPanel não tiver a opção Git, podes aceder via SSH (se ativo) ou usar FTP tradicional (Secção 3).

---

## 2. No teu computador local — Configurar o Git e fazer push

Abre o terminal na pasta do projeto:

```bash
# Inicializar Git (se ainda não estiver)
cd /caminho/para/a/pasta/do/site
git init

# Adicionar todos os ficheiros
git add -A

# Primeiro commit
git commit -m "Versão inicial do site JGremodelar"

# Adicionar o repositório remoto (substituir pelo URL do cPanel)
git remote add origin ssh://teuutilizador@teudominio.pt:porta/home/teuutilizador/public_html/jgremodelar

# Fazer push para o servidor
git push -u origin master
```

A partir daqui, sempre que quiseres atualizar o site:

```bash
git add -A
git commit -m "Descrição das alterações"
git push
```

O cPanel deteta automaticamente o push e atualiza a pasta `public_html` (conforme configurado).

---

## 3. Alternativa — Deploy via FTP (sem Git)

Se preferires não usar Git, podes usar um cliente FTP como **FileZilla**:

1. Abre o FileZilla e liga-te ao servidor com os dados FTP do cPanel.
2. Navega até `public_html/`.
3. Envia todos os ficheiros do projeto para essa pasta.
4. Substitui os ficheiros existentes quando solicitado.

---

## 4. Alternativa — Git Deploy via SSH (avançado)

Se tiveres acesso SSH ativo no cPanel:

```bash
# No servidor (via SSH)
cd ~/public_html
git init --bare ~/jgremodelar.git

# No teu computador, adicionar o remote
git remote add production ssh://teuutilizador@teudominio.pt/~/jgremodelar.git

# Configurar hook post-receive no servidor
ssh teuutilizador@teudominio.pt
cd ~/jgremodelar.git/hooks
nano post-receive
```

Conteúdo do `post-receive`:

```bash
#!/bin/sh
GIT_WORK_TREE=/home/teuutilizador/public_html
GIT_DIR=/home/teuutilizador/jgremodelar.git
git checkout -f
```

Tornar executável:

```bash
chmod +x post-receive
```

Agora, cada `git push production` atualiza automaticamente o site.

---

## 5. Ficheiros a enviar

Certifica-te de que estes ficheiros estão na raiz do `public_html`:

| Ficheiro      | Descrição                          |
|---------------|------------------------------------|
| `index.html`  | Página principal do site           |
| `.htaccess`   | Configurações de cache e segurança |

O site não necessita de base de dados nem de backend — é 100% estático.

---

## 6. Verificar se o site está no ar

Após o deploy, acede a:

- **https://jgremodelar.pt**

Se o domínio ainda apontar para o servidor, o site deve aparecer de imediato.

---

Dúvidas? Entra em contacto connosco ou consulta a documentação do teu provedor de alojamento.