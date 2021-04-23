import sys

sys.setrecursionlimit(10**6)

def merge_sort(playlist, temp, start, size):
	if size <= 1:
		pass

	if size == 2:
		print(playlist[start])
		print(palylist[start+1])
		choice = int(input("Type 1 for the frist option and 2 for the second option: "))

		if choice == 2:
			tmp = playlist[start]
			playlist[start] = playlist[start+1]
			playlist[start+1] = tmp

	merge_sort(playlist, temp, start, (size/2))
	merge_sort(playlist, temp, start+(size/2), size-(size/2))


	j = size/2
	d = 0

	for k in range(size):
		print(playlist[d+start])
		print(playlist[j+start])
		choice = int(input("Type 1 for the frist option and 2 for the second option: "))

		if (choice == 1 or j >= size) and d < size/2:
			temp[k+start] = playlist[d+start]
			d += 1
		else:
			temp[k+start] = playlist[j+start]
			j += 1

	for j in range(size):
		playlist[j+start] = temp[j+start]

	pass

#test
playlist = ["Brother", "Nina Cried Power", "Funhouse", "About Love", "Jackie and Wilson", "Victorious"]
temp = ["", "", "", "", "", ""]
merge_sort(playlist, temp, 0, 6)

	

