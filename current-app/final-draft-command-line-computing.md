# Final Draft: Computers Before the Friendly Screen

## BB 1289 - Before the Desktop

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** pre-gui-computing

**Floor 0:** Modern computers usually greet us with icons, windows, buttons, and a mouse pointer.

**Floor 1:** But computers did not begin that way.

**Floor 2:** For a long time, using a computer meant typing instructions as text.

**Floor 3:** There was no desktop to click around. You told the machine what to do by writing a command and pressing Enter.

**Floor 4:** This older style of using a computer is still important, because underneath the friendly screen, computers still respond to precise instructions.

---

## BB 1290 - The Command Line

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** command-line-interface

**Floor 0:** A command line is a place where you control a computer by typing commands.

**Floor 1:** Instead of clicking a folder, you type a command to move into it.

**Floor 2:** Instead of dragging a file, you type a command to move it.

**Floor 3:** Instead of opening a program from an icon, you type the program's name.

**Floor 4:** The command line looks plain, but it gives direct access to the computer's basic actions: move, list, read, create, copy, rename, delete, and run.

---

## BB 1291 - The Prompt

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** prompt

**Floor 0:** When a command-line computer is ready, it shows a prompt.

**Floor 1:** The prompt is the computer's way of saying, "I am waiting for your instruction."

**Floor 2:** You type a command after the prompt, then press Enter.

**Floor 3:** The computer reads the command, tries to do what you asked, and then shows the prompt again.

**Floor 4:** That loop is simple: wait, read, act, respond, wait again.

**Floor 5:** A lot of computing is built from that same pattern.

---

## BB 1292 - Commands Are Tiny Programs

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** commands

**Floor 0:** A command is not magic. It is usually a small program with a specific job.

**Floor 1:** One command lists files. Another changes folder. Another copies data. Another starts a program.

**Floor 2:** When you type a command, the computer looks for a program with that name.

**Floor 3:** If it finds one, it runs it. If it does not, it tells you the command was not recognized.

**Floor 4:** This is why command-line computing feels strict. The computer cannot guess as freely as a person can. It needs the command to be written in a form it understands.

---

## BB 1293 - Files and Folders

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** filesystem

**Floor 0:** Before you can control a computer with commands, you need to understand where things live.

**Floor 1:** A file is a named piece of stored information. It might contain text, a picture, music, code, or settings.

**Floor 2:** A folder is a container that can hold files and other folders.

**Floor 3:** The filesystem is the organized map of all those files and folders.

**Floor 4:** A mouse lets you explore that map visually. The command line lets you move through the same map by typing.

---

## BB 1294 - Where Am I?

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** current-directory

**Floor 0:** At any moment, the command line has a current location.

**Floor 1:** That location is the folder you are standing in.

**Floor 2:** The command `pwd` means "print working directory." It shows your current folder.

**Floor 3:** On Windows, the similar command is often `cd` by itself, which prints the current folder.

**Floor 4:** This matters because many commands act on the folder where you are currently standing.

**Floor 5:** Before you change, copy, or delete anything, it helps to ask the computer, "Where am I?"

---

## BB 1295 - Listing What Is Here

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** listing-files

**Floor 0:** Once you know where you are, the next question is, "What is here?"

**Floor 1:** The command `ls` lists the files and folders in the current location.

**Floor 2:** On Windows, the older command is `dir`.

**Floor 3:** These commands are the text version of opening a folder and looking inside.

**Floor 4:** They do not usually change anything. They simply show what exists.

**Floor 5:** Looking before acting is one of the safest habits in command-line work.

---

## BB 1296 - Moving Between Folders

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** changing-directory

**Floor 0:** To move through the filesystem, you use `cd`.

**Floor 1:** `cd` means "change directory." A directory is another word for a folder.

**Floor 2:** If you type `cd Documents`, you move into the Documents folder, if it exists where you are.

**Floor 3:** If you type `cd ..`, you move one level up to the parent folder.

**Floor 4:** This is like walking into a folder or stepping back out of it.

**Floor 5:** The command line has no mouse pointer, so your current folder is your position.

---

## BB 1297 - Reading a File

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** reading-files

**Floor 0:** Sometimes you do not need to open a full app to see what is inside a text file.

**Floor 1:** The command `cat filename` prints the contents of a file on the screen.

**Floor 2:** On Windows, `type filename` does a similar job.

**Floor 3:** If the file is short, the whole thing appears at once.

**Floor 4:** If the file is long, it may rush past too quickly, so people often use tools that let them scroll through it.

**Floor 5:** Reading files from the command line is useful because many computer settings, logs, and programs are stored as text.

---

## BB 1298 - Creating a Folder

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** creating-directories

**Floor 0:** The command line can also create new places to store work.

**Floor 1:** The command `mkdir notes` creates a folder called notes.

**Floor 2:** `mkdir` means "make directory."

**Floor 3:** After creating it, you can move into it with `cd notes`.

**Floor 4:** This is the command-line version of choosing "New Folder."

**Floor 5:** Creating folders is how you begin organizing work before files start piling up.

---

## BB 1299 - Copying and Moving

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** file-operations

**Floor 0:** Two common actions are copying a file and moving a file.

**Floor 1:** Copying keeps the original and creates another version somewhere else.

**Floor 2:** Moving changes where the file lives. It can also be used to rename a file.

**Floor 3:** The command `cp old.txt new.txt` copies a file on many systems.

**Floor 4:** The command `mv old.txt new-name.txt` moves or renames a file on many systems.

**Floor 5:** On Windows, similar commands are `copy` for copying and `move` or `ren` for moving and renaming.

---

## BB 1300 - Deleting Is Different

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** deletion

**Floor 0:** Some commands are safe because they only show information.

**Floor 1:** Deleting is different because it changes what exists.

**Floor 2:** On many systems, `rm filename` removes a file.

**Floor 3:** On Windows, `del filename` removes a file.

**Floor 4:** Command-line deletion may not behave like dragging something to a recycle bin. It can be immediate.

**Floor 5:** That is why careful users check their current folder and list the files before deleting anything.

---

## BB 1301 - Running a Program

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** executing-programs

**Floor 0:** A command line is not only for managing files. It can run programs too.

**Floor 1:** If a program is available to the command line, typing its name can start it.

**Floor 2:** For example, typing `python` may start Python. Typing `node` may start Node.js. Typing `git` may run Git.

**Floor 3:** Sometimes you give the program extra information after its name.

**Floor 4:** In `python script.py`, the command is `python`, and `script.py` is the file you want Python to run.

**Floor 5:** This is how typed commands become a way to control larger tools.

---

## BB 1302 - Arguments and Options

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** arguments-options

**Floor 0:** Many commands can be adjusted by adding extra words after them.

**Floor 1:** These extra words are called arguments or options.

**Floor 2:** An argument usually tells the command what to act on, such as a file or folder name.

**Floor 3:** An option changes how the command behaves.

**Floor 4:** For example, `ls` lists files, while `ls -l` asks for a more detailed list on many systems.

**Floor 5:** A command is like a verb. The arguments and options tell it what to act on and how to act.

---

## BB 1303 - Help

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** help-systems

**Floor 0:** Nobody memorizes every command perfectly.

**Floor 1:** Command-line tools usually include ways to ask for help.

**Floor 2:** Many commands understand `--help`, such as `git --help` or `python --help`.

**Floor 3:** On many Unix-style systems, `man command` opens the manual page for a command.

**Floor 4:** On Windows PowerShell, `Get-Help command` can explain how a command works.

**Floor 5:** Learning the command line is not about memorizing everything. It is about knowing how to ask the computer what a command can do.

---

## BB 1304 - Why This Still Matters

**Subject:** computing | **Topic:** Command Line Basics | **Concept:** abstraction

**Floor 0:** The command line may look old, but it is not obsolete.

**Floor 1:** Developers, system administrators, data analysts, security teams, and engineers still use typed commands every day.

**Floor 2:** Text commands are precise. They can be repeated, saved, shared, automated, and combined.

**Floor 3:** A graphical screen is good for seeing and choosing. A command line is good for giving exact instructions.

**Floor 4:** Learning commands also reveals something important about computers: the friendly screen is an interface, not the whole machine.

**Floor 5:** Underneath the icons and buttons, the computer is still a system waiting for instructions it can understand.
