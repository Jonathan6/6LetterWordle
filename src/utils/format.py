import sys

def read_file(openFileName, writeFileName):
    try:
        with open(openFileName, 'r', encoding='utf-8') as readFile:
            wr = open(writeFileName, "w")
            for line in readFile:
                word = " \"" + line[0:6].upper() + "\","
                wr.write(word)
            print("done.")

                
    except FileNotFoundError:
        print(f"Error: The file was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python format.py <readFileName> <writeFileName>")
    else:
        read_file(sys.argv[1], sys.argv[2])