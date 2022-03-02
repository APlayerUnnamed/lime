# update.py
"""
This is the lime updater

This program purges the current lime install (excludeing config.json) and reinstalls it!
This program is generally deigned for Windows (lime is multiplatform just not this script).

"""

# Imports
import sys
import psutil
import os

print("Running on " + sys.platform)
isWin = False
if ("win" in sys.platform):
    isWin = True
    import ctypes
    if not ctypes.windll.shell32.IsUserAnAdmin():
        print("Warning: Program is not running as a admin!")

# Check for node and kill it
for proc in psutil.process_iter():
    # check whether the process name matches
    if proc.name() == "node.exe":
        proc.kill()
        print("Warning: Node was detected running so it was killed!")

def yes_no(answer):
    yes = set(['yes','y', 'ye', ''])
    no = set(['no','n'])
     
    while True:
        choice = input(answer).lower()
        if choice in yes: return True
        elif choice in no: return False
        else: print("Please respond with 'yes' or 'no'\n")

if (yes_no(f"Detected current directory as \"{os.getcwd()}\",\nIs this correct?\n>> ")):
    print("Purgeing Lime...")
    try:
        os.remove(os.path.join(os.getcwd(), "lime"))
    except OSError as e:
        print(f"A fatal error stopped this process!\n{e}\nPlease reinstall lime following the instruction on https://github.com/APlayerUnnamed/lime ")
        if isWin:
            os.system("pause")
            print("Program will now exit with code 1!")
            exit(1)

    try:
        print("Reinstalling!")

else:
    print("Please reinstall lime following the instruction on https://github.com/APlayerUnnamed/lime ")
    if isWin:
        os.system("pause")
        print("Program will now exit!")
        sys.exit(0)
