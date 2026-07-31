package accountformats

import (
	"errors"
	"fmt"
)

type Error struct {
	Code    string
	Message string
	Fields  []string
}

func (e *Error) Error() string {
	if len(e.Fields) == 0 {
		return e.Message
	}
	return fmt.Sprintf("%s: %v", e.Message, e.Fields)
}

func errorf(code, format string, args ...any) error {
	return &Error{Code: code, Message: fmt.Sprintf(format, args...)}
}

func missingCredentials(ordinal int, fields []string) error {
	return &Error{
		Code:    "missing_cpa_credentials",
		Message: fmt.Sprintf("account %d cannot be converted to CPA", ordinal),
		Fields:  fields,
	}
}

func ErrorCode(err error) string {
	var target *Error
	if errors.As(err, &target) {
		return target.Code
	}
	return ""
}
