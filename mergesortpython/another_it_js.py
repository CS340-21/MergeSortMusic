import math
import json

def read_json_file():
	with open('tracks.json') as json_file:
		data = json.load(json_file)
		item = {}
		item = data.get('tracks')
		songs = []
		for d in item:
			songs.append(d['name'])
	return songs


def merge(A, temp, frm, mid, to, matchUps, worstCase):

	k = frm
	i = frm
	j = mid + 1

	# loop till no elements are left in the left and right runs
	while i <= mid and j <= to:
		matchUps += 1
		print(A[i])
		print(A[j])
		choice = int(input("Type 1 for the first song and 2 for the second song: "))
		if choice == 1:
			print("Match ", matchUps, " out of ", worstCase)			
			temp[k] = A[i]
			i = i + 1
		else:
			print("Match ", matchUps, " out of ", worstCase)			
			temp[k] = A[j]
			j = j + 1

		k = k + 1
		print("\n")

	while i < len(A) and i <= mid:
		temp[k] = A[i]
		k = k + 1
		i = i + 1

	# copy back to the original list to reflect sorted order
	for q in range(frm, to + 1):
		A[q] = temp[q]
	return matchUps


# Iteratively sort sublist `A[low…high]` using a temporary list
def mergesort(A):
	low = 0
	high = len(A) - 1
	matchUps = 0
	length = len(A)
	worstCase = int(math.ceil((length * math.log(length, 2)) - math.pow(2, math.log(length, 2)) + 1))
	# sort list `A` using a temporary list `temp`
	temp = A.copy()

	# divide the list into blocks of size `m`
	# m = [1, 2, 4, 8, 16…]

	m = 1
	while m <= high - low:

	# for m = 1, i = [0, 2, 4, 6, 8…]
	# for m = 2, i = [0, 4, 8, 12…]
	# for m = 4, i = [0, 8, 16…]
	# …

		for i in range(low, high, 2*m):
			frm = i
			mid = i + m - 1
			to = min(i + 2*m - 1, high)
			matchUps = merge(A, temp, frm, mid, to, matchUps, worstCase)

		m = 2*m

#driver
#a = [5, 7, 4]
a = read_json_file()
print("Original: ")
print(a)
mergesort(a)
print("Modified: ")
print(a)

