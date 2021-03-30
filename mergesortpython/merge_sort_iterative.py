#Credit for base code: Mohit Gupta_OMG
import math
def merge_sort(playlist):
	#Size of the initial subarrays
	curr_size = 1
	#This gives the combonation that the algorithm is currently on
	matchUps = 0
	length = len(playlist)
	#This gives the worst case amount of comparisions needed to sort the list
	worstCase = (length * math.log(length, 2)) - math.pow(2, math.log(length, 2)) + 1
	while curr_size < len(playlist) - 1:
		left = 0
		while left < len(playlist) - 1:
			#Find the middle of the playlist
			mid = min((left + curr_size - 1), (len(playlist)-1))
			#Find the right side of the playlist (either index twice the size of the subarray or the very end)
			right = ((2 * curr_size + left - 1, len(playlist) - 1)[2 * curr_size + left - 1 > len(playlist)-1])
			#Sort that subarray and return the current match up the sort is on
			matchUps = merge_list(playlist, left, mid, right, matchUps, worstCase)
			#Move to the next subarray
			left = left + (curr_size * 2)
		#All subarrays of the curr_size have been sorted so increase the size of the next subarrays
		curr_size = 2 * curr_size
	return matchUps

def merge_list(playlist, l, m, r, matchUps, worstCase):
	#Find the bounds of the array section looking at
	n1 = m - l + 1
	n2 = r - m
	#Populate L and R arrays with the prespective values
	L = [0] * n1
	R = [0] * n2
	for i in range(0, n1):
		L[i] = playlist[l + i]
	for i in range(0, n2):
		R[i] = playlist[m + i + 1]

	i = 0
	j = 0
	k = l

	while i < n1 and j < n2:
		matchUps += 1
		#Can save playlist here
		#Query user for choice between 2 songs
		#Set the song chosen either the value at L[i] or R[j] into the correct spot in playlist
		#Take the conditional below and change it to match how data is given to function based
		#on user input. Can also print the amount of match ups left by subtracting the worst from
		#matchUps variables.
		if L[i] > R[j]:
			print("Match ", matchUps, " out of ", math.floor(worstCase))
			playlist[k] = R[j]
			j += 1
		else:
			print("Match ", matchUps, " out of ", math.floor(worstCase))
			playlist[k] = L[i]
			i += 1
		k += 1

	#Fill the playlist with the rest of the values in L and R to be sorted in the next iteration of the while loop.
	#IF YOU WANT TO SAVE THE PLAYLIST STATE THEN SAVE IT AFTER THESE WHILE LOOPS
	while i < n1:
		playlist[k] = L[i]
		i += 1
		k += 1
	
	while j < n2:
		playlist[k] = R[j]
		j += 1
		k += 1

	return matchUps

#Driver
a = [12, 11, 13, 5, 6, 7, 1]
print("Given array is ")
print(a)
pairs = 0
pairs = merge_sort(a)
  
print("Sorted array is ")
print(a)

print("Matchups: ")
print(pairs)
