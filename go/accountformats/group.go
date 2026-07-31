package accountformats

func Group(accounts []Account, grouping Grouping) ([][]Account, error) {
	if len(accounts) == 0 {
		return nil, nil
	}
	if grouping.Mode == "" {
		grouping.Mode = GroupingMerge
	}
	switch grouping.Mode {
	case GroupingMerge:
		return [][]Account{append([]Account(nil), accounts...)}, nil
	case GroupingChunkSize:
		if grouping.ChunkSize <= 0 {
			return nil, errorf("invalid_grouping", "chunkSize must be a positive integer")
		}
		groups := make([][]Account, 0, (len(accounts)+grouping.ChunkSize-1)/grouping.ChunkSize)
		for start := 0; start < len(accounts); start += grouping.ChunkSize {
			end := min(start+grouping.ChunkSize, len(accounts))
			groups = append(groups, append([]Account(nil), accounts[start:end]...))
		}
		return groups, nil
	case GroupingCustomSizes:
		if len(grouping.Sizes) == 0 {
			return nil, errorf("invalid_grouping", "sizes must contain at least one positive integer")
		}
		groups := make([][]Account, 0, len(grouping.Sizes)+1)
		offset := 0
		for _, requestedSize := range grouping.Sizes {
			if requestedSize <= 0 {
				return nil, errorf("invalid_grouping", "sizes must contain only positive integers")
			}
			if offset >= len(accounts) {
				break
			}
			end := min(offset+requestedSize, len(accounts))
			groups = append(groups, append([]Account(nil), accounts[offset:end]...))
			offset = end
		}
		if offset < len(accounts) {
			groups = append(groups, append([]Account(nil), accounts[offset:]...))
		}
		return groups, nil
	case GroupingPartCount:
		if grouping.PartCount <= 0 {
			return nil, errorf("invalid_grouping", "partCount must be a positive integer")
		}
		count := min(grouping.PartCount, len(accounts))
		base, remainder := len(accounts)/count, len(accounts)%count
		groups := make([][]Account, 0, count)
		offset := 0
		for index := 0; index < count; index++ {
			size := base
			if index < remainder {
				size++
			}
			groups = append(groups, append([]Account(nil), accounts[offset:offset+size]...))
			offset += size
		}
		return groups, nil
	default:
		return nil, errorf("invalid_grouping", "unsupported grouping mode %q", grouping.Mode)
	}
}
