---
marp: true
lang: fr-FR
title: Formation Git
theme: my-theme
---

# Les bases de la contribution avec git

<!--
Où en êtes-vous avec git ? Comment l'utilisez-vous ?
-->

---

## Histoire du contrôle de version

![height:400px](https://git-scm.com/book/en/v2/images/local.png)

<!--
Un gestionnaire de version est un système qui enregistre l’évolution d’un fichier ou d’un ensemble de fichiers au cours du temps de manière à ce qu’on puisse rappeler une version antérieure d’un fichier à tout moment.

Avantages et inconvénients :
- Système centralisé (CVS, SVN) : unicité du point de panne, online, stockage des données comme des modifications
- Système décentralisé (Git) : réplication, offline (local), stockage des données comme des instantanés => vitesse
-->

---

## Histoire du contrôle de version

![height:400px](https://git-scm.com/book/en/v2/images/distributed.png)

<!--
Un gestionnaire de version est un système qui enregistre l’évolution d’un fichier ou d’un ensemble de fichiers au cours du temps de manière à ce qu’on puisse rappeler une version antérieure d’un fichier à tout moment.

Avantages et inconvénients :
- Système centralisé (CVS, SVN) : unicité du point de panne, online, stockage des données comme des modifications
- Système décentralisé (Git) : réplication, offline (local), stockage des données comme des instantanés => vitesse
-->

---

## QUIZZ

```
echo "Hello World!" > file.txt
git add file.txt
echo "Goodbye World!" > file.txt
git commit -m "Say something"
```

Que contient ce commit ?

1. Un fichier `file.txt` contenant *Hello World!*
2. Un fichier `file.txt` contenant *Goodbye World!*

---

> [!warning]
> Il y a trois états possibles pour un fichier dans git : **modifié** (_modified_), **indexé** (_staged_), **validé** (_commited_).

---

## Les commandes de base de git

<style scoped>
section {
  font-size: 2em;
}
</style>

* `git clone <url>`
* `git status`
* `git restore <file-or-directory>` (⚠️ destructif !)
* `git diff`
* `git add <file-or-directory>`, `git add --all`
* `git restore --staged <file-or-directory>`
* `git diff --staged`
* `git commit`, `git commit --all` (⇔ `git add -A && git commit`)
* `git log`

<!--
Ces commandes permettent de contribuer avec git localement (sur sa machine) à un projet déjà existant.

- Obtenir une copie locale du dépôt (_repository_) distant d'un projet :
`git clone <url>`
- Enregistrer ses modifications dans le dépôt :
    - Vérifier l'état des fichiers :
    `git status`
    - Remplacer un fichier par sa dernière version validée (la version du dernier _commit_) :
    `git restore <file-or-directory>` :warning: Supprime les modifications locales du fichier
    - Comparer le contenu de son espace de travail (_working directory_) avec la zone d’index (_staging area_) :
    `git diff`
    - Indexer les fichiers modifiés ou de nouveaux fichiers pour validation :
    `git add <file-or-directory>`, `git add --all`
        - Désindexer un fichier :
        `git restore --staged <file-or-directory>`
    - Comparer les fichiers indexés et le dernier instantané (_snapshot_) :
    `git diff --staged`
    - Valider (_commit_) les modifications :
    `git commit`, `git commit --all` (<=> `git add -A && git commit`)
- Visualiser l’historique des _commits_ :
`git log`
-->

---

```
git help everyday
```

- Toujours connaître l'état dans lequel on est, et ce qu'on est en train de faire (abuser de `git status`)
- Bien lire les sorties des commandes

---

## Un arbre et des branches

|  ![height:400px](https://git-scm.com/book/en/v2/images/snapshots.png)  |
|:----------------------------------------------------------------------:|
| Stockage des données comme des instantanés du projet au cours du temps |

<!--
Git ne stocke pas ses données comme une série de modifications ou de différences successives mais plutôt comme une série d’instantanés (*snapshots*) de l'espace de travail.

Ces instantanés sont référencés par des **commits**.
-->

---

## Un arbre et des branches

| ![width:1000px](https://git-scm.com/book/en/v2/images/commits-and-parents.png) |
|:------------------------------------------------------------------------------:|
|                            Commits et leurs parents                            |

<!--
Un **commit** est un pointeur vers un instantané (*snapshot*) - ou, plus exactement, un objet qui contient un pointeur vers un arbre (*tree*), des métadonnées et un pointeur vers son parent.
-->

---

## Un arbre et des branches

| ![height:400px](https://git-scm.com/book/en/v2/images/commit-and-tree.png) |
|:--------------------------------------------------------------------------:|
|                           Un commit et son arbre                           |

<!--
Notes :
- Aucun parent pour le commit initial, plusieurs pour un commit de fusion.
- Trois types d'objet : `commit`, `tree`, `blob`.
- Un `tag` est un `commit` qui pointe vers un autre `commit` au lieu d'un `tree`.
-->

---

## Un arbre et des branches

| ![height:400px](https://git-scm.com/book/en/v2/images/branch-and-history.png) |
|:-----------------------------------------------------------------------------:|
|                  Une branche et l’historique de ses commits                   |

<!--
Une **branche** est un pointeur vers un commit (le plus récent), qui avance automatiquement à chaque commit. `master` ou `main` est le nom de la branche par défaut. `HEAD` est un pointeur vers la branche courante.

Ces pointeurs sont stockés dans des fichiers dans `.git/ref/heads`.
-->

---

## Utiliser les branches

* `git branch <branch_name>`
* `git switch <branch_name>`
* `git switch --create <branch_name>` (⇔ `git branch <branch_name> && git switch <branch_name>`)

<!--
- Créer une nouvelle branche :
`git branch <branch_name>`
- Basculer sur une branche (<=> déplacer `HEAD` + restaurer les fichiers de l'espace de travail dans l'état du dernier instantané de la branche) :
`git switch <branch_name>`
    - Basculer sur une nouvelle branche :
`git switch --create <branch_name>` (<=> `git branch <branch_name> && git switch <branch_name>`)
-->

---

### Intégrer les modifications d'une branche dans une autre

Dans git, il y a deux façons d’intégrer les modifications d’une branche dans une autre : en fusionnant (_merge_) et en rebasant (_rebase_).

---

#### Fusion (_merge_)

`git switch master && git merge iss53`

| ![La branche iss53 fusionnée dans la branche master](https://git-scm.com/book/en/v2/images/basic-merging-2.png) |
|:---------------------------------------------------------------------------------------------------------------:|
|                              La branche `iss53` fusionnée dans la branche `master`                              |

<!--
Fusionner la branche `iss53` dans la branche `master`.

**Merge** réalise une fusion entre les deux derniers instantanés de chaque branche (C4 et C5) et l’ancêtre commun le plus récent (C2) en créant un commit résultant de cette fusion (_merge commit_).
-->

---

#### Fusion (_merge_)

| ![height:400px](https://git-scm.com/book/en/v2/images/basic-branching-3.png) |
|:----------------------------------------------------------------------------:|
|                    Cas où une avance rapide est possible                     |

<!--
Dans certains cas simples, git déplace simplement le pointeur de la branche (_fast-forward_). Ce peut être évité en utilisant l'option `--no-ff`.
-->

---

#### Rebasage (_rebase_)

`git switch experiment && git rebase master`

| ![width:1000px](https://git-scm.com/book/en/v2/images/basic-rebase-3.png) |
|:-------------------------------------------------------------------------:|
|                   Rebasage d'`experiment` sur `master`                    |

<!--
Réappliquer sur `master` (C3) les _patches_ des modifications introduites sur la branche `experiment` (C4).

**Rebase** rejoue les modifications d'une branche sur une autre.

**Rebase** crée de nouveaux commits : similaires en contenu mais différents en identité.
-->

---

> [!caution]
> **Ne pas rebaser des commits qui ont déjà été poussés sur un dépôt public** (avec une exception pour une branche personnelle en utilisant l'option `--force` lors du `push`).
> Cette règle s'applique de manière générale pour toutes les opérations qui modifient les commits.

---

### Merge vs. rebase ?

Rebaser pour un historique (donc une navigation) plus clair : une branche devenue linéaire.

---

## Résoudre les conflits avec sérénité : exemple

- `git switch master && git merge iss53`
- `git status`

```
<<<<<<< HEAD:index.html
<div id="footer">contact : email.support@github.com</div>
======
<div id="footer">
 please contact us at support@github.com
</div>
>>>>>>> iss53:index.html
```

<!--
- Identifier le(s) fichier(s) en conflit (_unmerged_) :
`git status`
- Modifier le(s) fichier(s) :
Au-dessus de la ligne ``=======`` se trouve la version dans `master`(`HEAD`), en-dessous se trouve la version de la branche `iss53`. Pour résoudre le conflit, il faut choisir une partie ou l’autre ou bien fusionner les contenus (en effaçant les lignes `<<<<<<<`, `=======` et `>>>>>>>`).
-->

---

## Résoudre les conflits avec sérénité : exemple

* `git add <file>`
* `git commit` ou `git rebase --continue`

<!--
- Marquer le(s) fichier(s) comme résolu(s) :
`git add <file>`
- Pour poursuivre en cas de merge : `git commit`
- Pour poursuivre en cas de rebase : `git rebase --continue`
-->

---

## Branches distantes

| ![height:400px](https://git-scm.com/book/en/v2/images/remote-branches-3.png) |
|:----------------------------------------------------------------------------:|
|                           Effets d'un `git fetch`                            |

<!--
**Clone** crée un pointeur `master` sur une branche locale et un pointeur `origin/master` sur la branche `master` distante. `origin` est le nom par défaut pour un dépôt distant (_remote_).
-->

---

## Branches distantes

* `git fetch origin`
* `git merge origin/master` ou `git rebase origin/master`
* `git push origin master`

<!--
- Récupérer les nouvelles modifications du dépôt distant :
`git fetch origin` (correspond à déplacer le pointeur `origin/master` et les pointeurs des éventuelles autres branches distantes)
- Appliquer ces nouvelles modifications dans son espace de travail, sur la branche `master` :
    - En fusionnant la branche distante `origin/merge` dans sa branche locale `master` :
`git merge origin/master`
    - En rebasant sa branche locale `master` sur la branche distante `origin/master` (à préférer pour un historique plus clair puisqu'évite des commits de fusion non significatifs) :
`git rebase origin/master`
- Pousser ses propres modifications sur le dépôt distant :
`git push origin master`

Les commandes restent les mêmes pour n'importe quelle autre branche et n'importe quel autre dépôt distant.
-->

---

## Branches distantes

- `git pull`
- `git pull -r` (⇔ `git fetch origin && git rebase origin/master`)

<!--
Il existe la commande `git pull` qui permet à la fois de récupérer les modifications et de les appliquer. L'utiliser avec l'option `--rebase` pour rebasage (<=> `git fetch origin && git rebase origin/master`).
-->

---

> [!tip]
> Penser à nettoyer les branches mortes !

---

## Les bases de git pour contribuer : les workflows

<!--
Ensemble de bonnes pratiques, recommendations.
-->

---

### Un workflow local simple (GitHub flow ?)

<style scoped>
section {
  font-size: 2em;
}
</style>

1. "Clean master": **Toutes les modifications doivent passer par des branches** basées sur `master` et dont le nom doit être descriptif : ex. `feature/<branch_name>`, `issue/<branch_name>`
2. "Continuous rebase" : Rebaser la branche sur `master` régulièrement pendant le développement pour éviter les conflits au moment du merge
3. Fusionner la branche dans `master` sans avance rapide (option `--no-ff`) ou en regroupant (_squash_) les commits en un seul avec l'option `--squash`

---

### Les workflows distribués : Integration-Manager Workflow

<style scoped>
section {
  font-size: 2em;
}
</style>

1. _Tout commence par une issue ?_
2. \[Optionnel] Si le projet est en lecture seule, dupliquer le projet (_fork_)
3. `git clone`
4. Effectuer vos modifications de préférence en suivant [un workflow](##Un-workflow-local-simple), jusque...
5. `git push`
6. _Pull Request_/_Merge Request_
    - _Revue de code_

<!--
Il s'agit du workflow le plus commun sur les forges telles que GitHub et GitLab.

D'autres workflows :
- Centralized Workflow
- Dictator and Lieutenants Workflow
- Envoi de patchs par email
-->

---

## Configurer git pour une collaboration réussie

- Si le dépôt distant est sur un serveur/une forge, configurer l'accès par SSH : [exemple pour GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

### Configuration globale

* `git config --global user.name "John Doe"`
* `git config --global user.email johndoe@example.com`
* `git config --global pull.rebase preserve`
* `git config --global core.autocrlf input` (Unix/Mac) et `git config --global core.autocrlf true` (Windows)

<!--
- `git config --global user.name "John Doe"`
- `git config --global user.email johndoe@example.com`
- Configurer le comportement de la commande `pull` (pour rebaser automatiquement :innocent:) :
`git config --global pull.rebase preserve` (preserve les commits de merge locaux) => `git pull` <=> `git pull --rebase`
- Configurer les caractères de fin de ligne (notamment dans le cas d'un collaboration entre développeurs Unix/Mac et Windows) :
    - Pour les développeurs Unix/Mac :
`git config --global core.autocrlf input`
    - Pour les développeurs Windows :
`git config --global core.autocrlf true`
-->

---

### Configuration globale

- `git config --global commit.template ~/git-template/.gitmessage.txt`

```
ISSUE_NUMBER
# TEMPLATE:
# 1. 50-character subject line - Imperative mode (starts with a verb)
# 2. One blank line
# 3. Optional body - Answers What? and Why?
```
Exemple de template de message de commit

<!--
- Configurer un template de message de commit (_[+ hook de validation]_) :
`git config --global commit.template ~/git-template/.gitmessage.txt`
-->

---

### Configuration du dépôt

- Exclure les fichiers du suivi dans un fichier `.gitignore`

---

## Configurer git pour une collaboration efficace : les aliases ?

```
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

---

## Git avancé pour contribuer : exercice

<style scoped>
section {
  font-size: 1em;
}
</style>

1. Cloner le projet https://github.com/hjonin/formation-git-exercice/
2. Basculer sur la branche `feature/todo`
3. Défaire les modifications du dernier commit de la branche (i.e. inverser (`revert`) le dernier commit)
4. Remplacer le message de commit (i.e. modifier (`amend`) le message du dernier commit) par : _"Silence is golden"_
5. Appliquer les patches des modifications introduites par l'avant-dernier commit (`6eaf39`) de la branche `feature/incomplete` (i.e. picorer (`cherry-pick`) l'avant-dernier commit de la branche `feature/incomplete`)
   - Modifier le fichier README : répondre au sondage et à la question
6. Ne commit que la réponse au sondage (i.e. indexer partiellement le fichier puis commit) avec le message _"And my birth month"_
7. Fusionner (`squash`) les deux derniers commits (en ne gardant que le message de l'avant-dernier commit)
    - Git refuse : mettre d'abord vos modifications de côté (i.e. remiser (`stash`) votre espace de travail dans une pile dédiée)
8. Rebaser la branche sur `main`
   - Résoudre le conflit
9. Ré-appliquer les modifications mises de côté
10. Encore un conflit... Nettoyer (`reset`) simplement l'espace de travail (:warning: supprime toutes les modifications en cours)
11. Créer l'étiquette (`tag`) `the.end`
12. \[PR]

<!--
Correction :

Résultat visible sur la branche[`feature/answer`](https://github.com/hjonin/formation-git-exercice/tree/feature/answer).

1. `git clone https://github.com/hjonin/formation-git-exercice/`
2. `git switch feature/todo`
3. `git revert HEAD`
4. `git commit --amend`
5. `git cherry-pick <commit_id>`
6. `git add --patch`, commande `s` (pour _split_) pour rafiner le découpage des modifications, puis `git commit`
7. `git stash && git rebase --interactive HEAD~2`, commande `s` (pour _squash_)
8. `git rebase main`
9. `git stash apply` ou `git stash pop` pour supprimer les modifications de la pile
10. `git reset --hard`
11. `git tag the.end`
-->

---

## Git bonus

* `git commit --fixup` puis `git rebase -i --autosquash`
* `git reflog`

---

## Git bonus

- `git bisect` : use binary search to find the commit that introduced a bug

```
git bisect start
git bisect bad # Current version is bad
git bisect good <commit>
# Then
git bisect good # or git bisect bad
# Finally
git bisect reset
```

---

## Ressources

<style scoped>
section {
  font-size: 2em;
}
</style>

- La doc officielle : https://git-scm.com/doc
- S'entraîner avec les branches (vintage) : https://learngitbranching.js.org/
- Guide sur les PR : https://docs.github.com/en/pull-requests
- Guides sur la revue de code :
    - https://google.github.io/eng-practices/review/reviewer/
    - https://github.com/thoughtbot/guides/tree/main/code-review
- Exemples de `.gitignore` :
    - https://github.com/github/gitignore
    - https://www.toptal.com/developers/gitignore

---

### Cheatsheets

<style scoped>
section {
  font-size: 2em;
}
</style>

- https://training.github.com/downloads/fr/github-git-cheat-sheet.pdf
- http://ndpsoftware.com/git-cheatsheet.html
- [https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet]
- [https://about.gitlab.com/images/press/git-cheat-sheet.pdf]
- https://git-scm.com/docs/giteveryday

---

### Commencer à contribuer

<style scoped>
section {
  font-size: 2em;
}
</style>

- https://github.com/firstcontributions/first-contributions
- https://firstcontributions.github.io/#project-list
- https://github.com/showcases/great-for-new-contributors
- https://opensource.guide/how-to-contribute/#finding-a-project-to-contribute-to
- good first issues :  `github.com/<owner>/<repository>/contribute`
- https://github.com/mungell/awesome-for-beginners
- https://up-for-grabs.net/#/
