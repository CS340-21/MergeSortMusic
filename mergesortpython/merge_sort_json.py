import json


def sort(playlist, l, r):
	if l < r:
		global m
		global sorted
		sorted = 0
		m = (l+(r-1))//2
		sort(playlist, l, m)
		sort(playlist, m+1, r)

	def merge(playlist, l, mid, r):
	
		fh = mid - l + 1
		lh = r - mid

		L = [0] * (fh)
		R = [0] * (lh)

		for i in range(0 , fh):
			L[i] = playlist[l + i]

		for j in range(0 , lh):
			R[j] = playlist[mid + 1 + j]

		i = j = 0
		k = l

		while i < fh and j < lh:
			#Need something here to get input from module (user) in the form of a
			#choice between two songs. For testing purposes (for now), it asks the user
			#for input directly
			print("\n")
			print(L[i])
			print(R[j])
			choice = int(input("Type 1 for first song or type 2 for second song: "))

			if choice == 1:
				playlist[k] = L[i]
				i += 1
			else:
				playlist[k] = R[j]
				j += 1
			k += 1

		while i < fh:
			playlist[k] = L[i]
			i += 1
			k += 1

		while j < lh:
			playlist[k] = R[j]
			j += 1
			k += 1
	
	merge(playlist, l, m, r)

#def sort(playlist, l, r):
#	if l < r:
#		m = (l+(r-1))//2
#		sort(playlist, l, m)
#		sort(playlist, m+1, r)
#		merge(playlist, l, m, r)

def read_json(songs):
	with open(songs) as file:
		data = json.load(file)
	curr_p = data["playlist"][0]["tracks"]
	return curr_p

#Driver code/test code
#playlist = ["dont take the money", "wild heart", "Gladiator", "uptown funk", "riptide",
#	"Brother", "Jackie and Wilson", "About Love", "Sleep on the floor"]
playlist = ["hello", "cut my lip", "brother", "nina cried power", "talk"]
n = len(playlist)
songs = "songs.json"
p = read_json(songs)
t = len(p)
print("Original:")
print("\n")
for i in playlist:
	print(i)
sort(playlist, 0, n-1)
#sort(p, 0, t-1)
print("\n")
print("Sorted:")
print("\n")
for i in playlist:
	print(i)



