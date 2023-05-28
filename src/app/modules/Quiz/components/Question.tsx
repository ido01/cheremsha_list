import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IQuestion } from 'types/IQuestion'

import { quizActions } from '../slice'

interface QuestionProps {
    expanded: number
    index: number
    qid: string
    question: IQuestion
    onExpandedChange: (value: number) => void
    onNext: () => void
}

export const Question: React.FC<QuestionProps> = ({ expanded, index, qid, question, onExpandedChange, onNext }) => {
    const dispatch = useDispatch()

    const [value, setValue] = useState<string>(question.state?.vid || '')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value)
    }

    const handleAnswer = () => {
        dispatch(quizActions.question({ id: qid, qid: question.id, vid: value }))
        onNext()
    }

    return (
        <Accordion expanded={expanded === index} sx={{ flexGrow: 1 }} onChange={() => onExpandedChange(index)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Вопрос {index + 1} {question.state ? '✓' : ''}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="body1">{question.text}</Typography>

                <Divider sx={{ mt: 1, mb: 2 }} />

                <FormControl sx={{ width: '100%' }}>
                    <RadioGroup value={value} onChange={handleChange}>
                        {question.variants.map((variant) => (
                            <FormControlLabel
                                key={variant.uniq}
                                value={variant.id}
                                control={<Radio />}
                                label={variant.text}
                                sx={{ width: '100%' }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton disabled={!value} color="success" variant="contained" onClick={handleAnswer}>
                        Ответить
                    </LoadingButton>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
