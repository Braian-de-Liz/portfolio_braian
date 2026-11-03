import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlaygroundZbr } from '../PlaygroundZbr';

describe('PlaygroundZbr', () => {
    it('valida um CPF correto e mostra a saída normalizada', async () => {
        render(<PlaygroundZbr />);

        expect(await screen.findByText('Válido')).toBeInTheDocument();
        expect(screen.getByText('12345678909')).toBeInTheDocument();
    });

    it('rejeita uma sequência inválida', async () => {
        const user = userEvent.setup();
        render(<PlaygroundZbr />);
        await screen.findByText('Válido');

        await user.click(screen.getByRole('button', { name: /exemplo inválido/i }));

        expect(await screen.findByText('Rejeitado')).toBeInTheDocument();
        expect(screen.getByText('CPF inválido')).toBeInTheDocument();
    });

    it('troca o tipo de documento e valida com a regra dele', async () => {
        const user = userEvent.setup();
        render(<PlaygroundZbr />);
        await screen.findByText('Válido');

        await user.click(screen.getByRole('button', { name: 'Telefone' }));

        expect(await screen.findByText('47933803828')).toBeInTheDocument();
    });
});
