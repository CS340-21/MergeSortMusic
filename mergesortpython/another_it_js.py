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
	#start of the whole playlist
	low = 0
	#End of the while playlist
	high = len(A) - 1
	#Holds how many comparisions will be made
	matchUps = 0
	#Calculates the most amount of comparisons to be made
	length = len(A)
	worstCase = int(math.ceil((length * math.log(length, 2)) - math.pow(2, math.log(length, 2)) + 1))
	#Create a temp to hold the intermediate values of the playlist
	temp = A.copy()

	#Chunk breakdown with m = 1 and a = [12, 11, 13, 5, 6, 7]:
	#[ [12, 11], [13, 5], [6, 7] ]
	#  frm  to   frm  to  frm to
	#  mid       mid      mid

	#Chunk breakdown with m = 2 and a = [12, 11, 13, 5, 6, 7]:
	#[ [12, 11, 13, 5], [6, 7] ]
	#   frm mid     to  frm mid
	#                       to


	#Size of the (half) chunks in the array to be sorted, starting with size 1 (1 element)
	m = 1
	while m <= high - low:
	#runs while m is less than the size of the whole playlist
		#From the beginning of the playlist to the end, jumping chunk to chunk (size m)
		for i in range(low, high, 2*m):
			#frm is the beginning of the chunk, mid is the middle of the chunk, to is whatever is the smallest
			#is between the last element of the chunk or the very end of the playlist (for odd numbered playlist)
			frm = i
			mid = i + m - 1
			to = min(i + 2*m - 1, high)
			matchUps = merge(A, temp, frm, mid, to, matchUps, worstCase)
		#The size of the chunks increase
		m = 2*m

#driver
#a = [5, 7, 4]
a = read_json_file()
print("Original: ")
print(a)
mergesort(a)
print("Modified: ")
print(a)

