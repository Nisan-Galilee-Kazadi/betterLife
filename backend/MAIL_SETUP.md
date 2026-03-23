Configuration email admin

Pour envoyer une vraie reponse email depuis le panel admin, le backend doit avoir un SMTP configure.

Variables a ajouter dans `backend/.env` :

```env
MAIL_SERVICE=gmail
MAIL_USER=votrecompte@gmail.com
MAIL_PASSWORD=votre_mot_de_passe_d_application
MAIL_FROM=votrecompte@gmail.com
MAIL_FROM_NAME=Better Life
MAIL_REPLY_TO=betterlifeorg@gmail.com
MAIL_REPLY_TO_NAME=Better Life
```

Notes :

- Si tu utilises Gmail, `MAIL_PASSWORD` doit etre un mot de passe d'application Google, pas ton mot de passe habituel.
- `MAIL_FROM` est l'adresse qui envoie l'email.
- `MAIL_REPLY_TO` est l'adresse qui recevra les reponses. Mets ici ton Gmail si tu veux que les retours arrivent dans Gmail.
- Si tu n'utilises pas Gmail, tu peux remplacer `MAIL_SERVICE=gmail` par :

```env
MAIL_HOST=smtp.votreserveur.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=...
MAIL_PASSWORD=...
MAIL_FROM=...
MAIL_REPLY_TO=betterlifeorg@gmail.com
```

Apres modification de `backend/.env`, redemarre le serveur backend.
