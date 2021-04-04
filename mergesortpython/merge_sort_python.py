def merge(playlist, l, m, r):
	fh = m - l + 1
	lh = r - m

	L = [0] * (fh)
	R = [0] * (lh)

	for i in range(0 , fh):
		L[i] = playlist[l + i]

	for j in range(0 , lh):
		R[j] = playlist[m + 1 + j]

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


def sort(playlist, l, r):
	if l < r:
		m = (l+(r-1))//2
		sort(playlist, l, m)
		sort(playlist, m+1, r)
		merge(playlist, l, m, r)

#Driver code/test code
playlist = ["ABC", "Bye Bye Bye", "Gladiator", "Brother", "Sky full of starts", "Jackie and Wilson", "About Love", "Sleep on the floor"]
n = len(playlist)
print("Original:")
print("\n")
for i in playlist:
	print(i)
sort(playlist, 0, n-1)
print("\n")
print("Sorted:")
print("\n")
for i in playlist:
	print(i)


